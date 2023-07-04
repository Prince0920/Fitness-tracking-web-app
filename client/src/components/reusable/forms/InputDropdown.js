import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';

const InputDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleMenuClick = ({ key }) => {
    setSelectedOption(key);
    // Handle menu click here
    console.log('Selected:', key);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[selectedOption]}>
      {options.map(option => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement='bottomRight'>
      <a
        href='#!'
        className='ant-dropdown-link'
        onClick={e => e.preventDefault()}>
        {selectedOption} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default InputDropdown;
