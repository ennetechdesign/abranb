type TitleUnderlineProps = {
    title: string;
    color?: string;
    position: "start" | "center"
}

export default function TitleUnderline({ title, color = 'title-decoration', position }: TitleUnderlineProps) {
    return (
        <div className={`flex flex-col font-bold items-center max-lg:text-center lg:items-${position} justify-${position}`}>
            <h2 className={`text-display ${color === 'gold' ? 'text-gold' : 'text-title-decoration'} tracking-wide`}>
                {title}
            </h2>
            <div className={`mt-2 h-0.5 w-1/2 lg:w-3/4 ${color === 'gold' ? 'bg-gold' : 'bg-title-decoration'} rounded-full`}></div>
        </div>
    )
}