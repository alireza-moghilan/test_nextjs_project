import 'bootstrap/dist/css/bootstrap.min.css'


export default function Layout({children}:{children:React.ReactNode}){
    return(
        <>
        <html>
            <body>
            {children}
            </body>
        </html>
        </>
    )
}