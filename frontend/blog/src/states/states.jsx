import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist();
export const MemberIdState = atom({
    key:'memberIdState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})
export const LoginIdState = atom({
    key: 'loginIdState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const CompanyState = atom({
    key: 'companyState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const RoleState = atom({
    key: 'roleState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const EmailState = atom({
    key: 'emailState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const TelState = atom({
    key: 'telState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const AccessTokenState = atom({
    key: 'accessTokenState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

export const RefreshTokenState = atom({
    key: 'refreshTokenState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})