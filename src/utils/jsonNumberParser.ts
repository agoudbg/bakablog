export default function jsonNumberParser(json: { [key: string]: any } | any[]) {
  if (Array.isArray(json)) {
    return json.map((item) => jsonNumberParser(item));
  }
  if (typeof json === "object") {
    for (const key in json) {
      json[key] = jsonNumberParser(json[key]);
    }
  }
  return json;
}
