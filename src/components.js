import call from "react-native-phone-call";

export const makeCall = number => {
    const args = {
        number: number,
        prompt: false
    }
    call(args).catch(console.error)
}