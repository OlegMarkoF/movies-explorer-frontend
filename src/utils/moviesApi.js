import { sendRequest } from "./utils";

const API_MOVIES_URL = "https://api.nomoreparties.co";

export function getCards() {
    return sendRequest(API_MOVIES_URL, "/beatfilm-movies", "GET");
}