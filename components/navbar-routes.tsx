"use client";


import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, LogOut, MoveRight, User } from "lucide-react";
import Link from "next/link";
//import SearchInput from "./search-input";
//import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
	const pathname = usePathname();
	const isTeacherPage = pathname?.startsWith("/teacher");
	const isCoursePage = pathname?.includes("/courses");

	const isSearchPage = pathname === "/search";
	//const { userId } = useAuth();
	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					{/*<SearchInput />*/}
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				{isCoursePage && (
					<Link
						href={`/search`}
						className="flex items-center text-sm hover:opacity-75 transition "
					>
						<Button size="sm" variant="ghost">
							<ArrowLeft className="h-4 w-4 mr-2" /> Back to course
						</Button>
					</Link>
				)}
				{isTeacherPage || isCoursePage ? (
					<Link href="/">
						<Button size="sm" variant="ghost">
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) :  (
					<Link href="/teacher/courses">
						<Button size="sm" variant="ghost">
							<MoveRight className="text-red-800" /> Teacher mode
						</Button>
					</Link>
				) 
			
}
				
			</div>
		</>
	);
};

export default NavbarRoutes;
