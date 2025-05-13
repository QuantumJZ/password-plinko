import PlinkoBoard from '@/components/PlinkoBoard';

export default function Home() {
	return (
		<div className="flex flex-col content-center justify-center min-h-screen">
			<main className="flex flex-col gap-[32px] row-start-2 items-center">
				<div className="border-4 border-white">
					<PlinkoBoard />
				</div>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
