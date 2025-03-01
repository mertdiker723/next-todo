"use client"

import { redirect, usePathname } from 'next/navigation'
import Link from 'next/link'

// Commons
import Button from '@/app/common/Button'

// Routes
import { routeUrls, apiPath } from '@/lib/routes'

// Libs
import { apiRequest } from '@/lib/helpers'

// Styles
import './Style.scss'

const Navbar = () => {
    const pathname = usePathname();
    const handleLogout = async () => {
        const res = await apiRequest(apiPath.logoutPathApi, 'POST');
        if (res.ok) {
            redirect(routeUrls.loginPath)
        }
    }

    if ([routeUrls.loginPath, routeUrls.registerPath].includes(pathname)) return null;

    return (
        <div className='navbar-container'>
            <div>
                <Link href={routeUrls.homePath} className='hover:underline'>Home</Link>
                <Link href={routeUrls.todoPath} className='links-item hover:underline ml-2'>Todos</Link>
                <Link href={routeUrls.aboutPath} className='links-item hover:underline ml-2'>About</Link>
            </div>
            <Button
                title='Logout'
                type='button'
                customClass='links-item'
                onClick={handleLogout}
            />
        </div>
    )
}

export default Navbar