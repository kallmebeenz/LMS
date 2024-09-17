import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { coursecode: string } }
) {
	try {
		
		// console.log(userId);

		const { url } = await req.json();
		const coursecode = params.coursecode;
		console.log(url);
		console.log(coursecode);
		// console.log(url.split("/").pop());
		// const urlName = url.split("/");
		// console.log(urlName);
		
		// check the course owner
		const courseOwner = await db.course.findUnique({
			where: {
				id: coursecode,
				
			},
		});
		if (!courseOwner) {
			return new NextResponse("Unauthorized ", { status: 401 });
		}

		const attachment = await db.attachment.createMany({
			data: {
				url,
				// the url : "https://www.example.com/page.html"
				name: url.split("/").pop(), // return name: page.html
				courseId: coursecode,
			},
		});
		return NextResponse.json(attachment);
	} catch (error) {
		console.log("[  ATTACHMENTS] ", error);
		return new NextResponse("Internal Error ", { status: 500 });
	}
}
