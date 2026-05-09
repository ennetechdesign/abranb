export default function BackgroundFixed({children}: {children:React.ReactNode}) {
    return (
        <div className="bg-[url(/images/historia.svg)] bg-no-repeat bg-cover bg-fixed">
            {children}
        </div>
    )
}