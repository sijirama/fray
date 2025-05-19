import { cn } from "@/lib/utils"
import { SquareDashedMousePointer } from "lucide-react"
import Link from "next/link"

function Logo({ fontSize = "text-2xl", iconSize = 20 }: { fontSize?: string, iconSize?: number }) {
	return (
		<Link href={"/"}
			className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}
		>
			<div className="rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 p-2">
				<SquareDashedMousePointer size={iconSize} />
			</div>
			<div>
				fray
			</div>
		</Link>
	)
}

export default Logo
