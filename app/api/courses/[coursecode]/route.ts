import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { coursecode: string } }
) {
	try {
		

		const { coursecode } = params;
		const values = await req.json();
		console.log(coursecode);
		console.log("[COURSE_ID]", coursecode);

		
		const course = await db.course.update({
			where: {
				id: coursecode,
				
			},
			data: {
				...values,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSE_ID]", error);
		return new NextResponse("Internal Error ", { status: 500 });
	}
}
