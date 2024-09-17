import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
	req: Request,
	{ params }: { params: { coursecode: string; attachmentId: string } }
) {  
	try {
		

		const courseOwner = await db.course.findUnique({
			where: {
				id: params.coursecode,
				
			},
		});

		if (!courseOwner) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const attachment = await db.attachment.delete({
			where: {
				courseId: params.coursecode,
				id: params.attachmentId,
			},
		});

		return NextResponse.json(attachment);
	} catch (error) {
		console.log("ATTACHMENT_ID", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
