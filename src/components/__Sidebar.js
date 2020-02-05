import '../assets/sass/nlm/sidebar.scss'
import React from 'react'
import SidebarFiltersClass from './SidebarFiltersClass'
import { useWindowSize } from '../store/hooks/useWindowSize'

const Sidebar = () => {
    let { width } = useWindowSize()
    let currentSidebar = null
    if (width > 600) {
        currentSidebar = (
            <div className="sidenav-sections">
                <SidebarFiltersClass />
            </div>
        )
    }

    return currentSidebar
}
export default Sidebar
