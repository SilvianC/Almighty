package com.example.A201.chatbot.service;
import com.example.A201.board.domain.BmsBoard;
import com.example.A201.chatbot.domain.ChatLog;
import com.example.A201.chatbot.dto.ChatLogDto;
import com.example.A201.chatbot.repository.ChatLogRepository;
import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ChatLogService {

    @Autowired
    private ChatLogRepository chatLogRepository;

    @Autowired
    private MemberRepository memberRepository; // 추가

    @Value("${openai.api.key}")
    private String openaiApiKey;

    public ChatLogDto getAnswerFromChatGPT(Long memberId, BmsBoard bms) {
        String hardcodedQuestion = String.format("당신은 배터리 전문가입니다. 다음 데이터를 통해 배터리 상태를 판단하세요: " +
                        "비정상 온도 횟수=%d, 제조 날짜=%s, 과전류 횟수=%d, 과전압 횟수=%d, 수령 날짜=%s, 저전압 횟수=%d. " +
                        "답변은 반드시 '불량' 또는 '정상'으로 하며, 이유는 반드시 80자 이내로 설명하세요. 이유는 한줄로 설명하세요. 정보 부족같은 답은 불가능합니다"+
                        "답변 형식은 분석 결과:, 분석 내용: 형식으로 하세요. 예외는 없습니다. 분석 결과에는 불량 또는 정상을, 분석 내용에는 이유를 쓰세요. 분석 결과와 분석 내용 사이에는 엔터를 치세요." +
                        "중간에 빈 값이 존재 해도 티내지말고 주어진 정보로만 분석하세요. 이유에 정보 부족이라는 내용을 담지마세요. 부족하면 부족한대로 이유를 도출하세요",
                bms.getAbnormalTemperatureCount(), bms.getMadeDate(), bms.getOverCurrentCount(), bms.getOverVoltageCount(), bms.getReceiveDate(), bms.getUnderVoltageCount());
        String botResponse = callOpenAIApi(hardcodedQuestion);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found!"));

        chatLogRepository.save(ChatLog.builder()
                .member(member)
                .userMessage(hardcodedQuestion)
                .botResponse(botResponse)
                .build());

        return ChatLogDto.builder()
                .userMessage(hardcodedQuestion)
                .botResponse(botResponse)
                .build();
    }

    private String callOpenAIApi(String hardcodedQuestion) {
        // OpenAI API를 호출하고 응답을 반환하는 로직
        // 예를 들면, RestTemplate나 HttpClient 등의 도구를 사용하여
        // OpenAI endpoint에 POST 요청을 보내고 응답을 처리할 수 있습니다.
        final String ENDPOINT_URL = "https://api.openai.com/v1/chat/completions";
        final String AUTH_HEADER = "Authorization";
        final String AUTH_VALUE = "Bearer " + openaiApiKey;

        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(AUTH_HEADER, AUTH_VALUE);

        // 요청 바디 설정
        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "system");
        userMessage.put("content", "You are a helpful assistant.");
        messages.add(userMessage);

        userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", hardcodedQuestion);
        messages.add(userMessage);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("messages", messages);
        requestBody.put("max_tokens", 250);  // 응답의 최대 토큰 수, 필요에 따라 조정 가능
        requestBody.put("model", "gpt-4-1106-preview");
        log.info("Sending request to OpenAI API with body: {}", requestBody);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(ENDPOINT_URL, HttpMethod.POST, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            log.info("Received response from OpenAI API: {}", responseBody);
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty() && choices.get(0).containsKey("message")) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    if (message.containsKey("content")) {
                        return (String) message.get("content");
                    }
                }
            }
            return "API response is not as expected.";
        } catch (RestClientException e) {
            // 로그 처리나 특별한 예외 처리를 여기에 추가할 수 있습니다.
            log.error("Error while calling the OpenAI API", e);
            return "Error while calling the API.";
        }
    }
}
