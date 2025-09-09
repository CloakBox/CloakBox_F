import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {SidebarHeader} from "./SidebarHeader.tsx";


export const SideBar = () => {

    return (
        <Sidebar
            image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        >
            <SidebarHeader  style={{marginBottom: '24px', marginTop: '16px'}}/>
            <div style={{flex: 1, marginBottom: '32px'}}>
                <Menu>
                    <SubMenu label="내가만든대분류들어갈꺼임">
                        <MenuItem>그안의소분류</MenuItem>
                    </SubMenu>
                    <MenuItem> 내가만든대분류들어갈꺼임 </MenuItem>
                    <MenuItem> 내가만든대분류들어갈꺼임 </MenuItem>
                </Menu>
            </div>
        </Sidebar>

    )
}
