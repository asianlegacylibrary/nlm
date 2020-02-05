import React from 'react'

const MenuOption = ({ option, handleClick, current }) => {
    let c = current === option.key ? 'active' : ''
    return (
        <li
            key={option.key}
            className="tab col s3" //"col-4 col-12-small"
            style={{ display: 'inline-block' }}
        >
            <a
                //disabled={disabled}
                className={c}
                onClick={() => handleClick(option)}
                href={`#${option.key}`}
            >
                {option.label}
            </a>
        </li>
    )
}
export default MenuOption
