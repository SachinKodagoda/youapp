import { getHoroscope } from "@/utils/get-horoscope";
import { getZodiac } from "@/utils/get-zodiac";
import { parse } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date"); // YYYY-MM-DD format

  if (dateParam) {
    const parsedDate = parse(dateParam, "yyyy-MM-dd", new Date());
    if (isNaN(parsedDate.getTime())) {
      return Response.json({
        error: "Invalid date format. Use yyyy-MM-DD",
        example: "/api/zodiac?date=1995-03-25",
      });
    }

    const month = parsedDate.getMonth() + 1; // getMonth() returns 0-11
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();

    const horoscope = getHoroscope(month, day);
    const zodiac = getZodiac(year);

    return Response.json({
      date: dateParam,
      horoscope,
      zodiac,
    });
  }

  return Response.json({
    error: "Please provide date parameter",
    example: "/api/zodiac?date=1995-03-25",
  });
}
