import React from 'react'
import {GithubOutlined,LinkedinOutlined} from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',background:'#DAE3FC',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p><a href="https://nivedin.github.io/MyPortfolio/#aboutMe"> Nivedin</a>-{new Date().getFullYear() } </p>
           <div style={{
            height: '20px', display: 'flex',
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', fontSize:'2rem'
        }}>
              <a href="https://github.com/nivedin"> <GithubOutlined style={{paddingRight:'40px'}}/></a><a href="www.linkedin.com/in/nivedin-p-suryan-561357188"><LinkedinOutlined /></a> 
           </div>    
        </div>
    )
}

export default Footer;
