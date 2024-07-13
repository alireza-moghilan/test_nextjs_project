// import 'bootstrap/dist/css/bootstrap.min.css'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./global.scss";
// import google Font
import {Josefin_Sans} from 'next/font/google';

const font = Josefin_Sans({ subsets: ['latin'] })
export default function Layout({children}:{children:React.ReactNode}){  
    return(
        <>
        <html className={font.className}>
            <body className={font.className}>
            <AntdRegistry>
            {children}
            </AntdRegistry>
            </body>
        </html>
        </>
    )
}