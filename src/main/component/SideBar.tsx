import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {SidebarHeader} from "./SidebarHeader.tsx";
import bg from '../../assets/img/bg.png'


export const SideBar = () => {

    return (
        <Sidebar
            image={bg}
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
