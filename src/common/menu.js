import {isUrl} from '../utils/util'

const menuData = [
    {
        name: 'CRA DVA',
        icon: 'cra',
        path: '/',
        authority: 'guest',
        children: [
            {
                name: 'User',
                path: 'user',
                children: [
                    {
                        name: 'Login',
                        path: 'login'
                    }
                ]
            }
        ]
    }
]

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let {path} = item
        if (!isUrl(path)) {
            path = parentPath + item.path
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        }
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
        }
        return result
    })
}


export const getMenuData = () => formatter(menuData)

