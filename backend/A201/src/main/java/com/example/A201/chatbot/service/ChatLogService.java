package com.example.A201.chatbot.service;
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

    public ChatLogDto chatWithBot(ChatLogDto request) {
        String botResponse = callOpenAIApi(request.getUserMessage());

        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("Member not found!"));

        chatLogRepository.save(ChatLog.builder()
                .member(member) // 수정
                .userMessage(request.getUserMessage())
                .botResponse(botResponse)
                .build());

        return ChatLogDto.builder()
                .userMessage(request.getUserMessage())
                .botResponse(botResponse)
                .build();
    }

    private String callOpenAIApi(String prompt) {
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
        userMessage.put("content", prompt);  // 사용자로부터 입력받은 메시지
        messages.add(userMessage);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("messages", messages);
        requestBody.put("max_tokens", 150);  // 응답의 최대 토큰 수, 필요에 따라 조정 가능
        requestBody.put("model", "gpt-3.5-turbo-16k");
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
