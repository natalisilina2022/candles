import './index.css';
import logoSrc from './logo.png'

function Logo({className, href, ...props}) {
  return (
    <a href={href ? href : "#"} className={className ? className : "logo"} {...props}>
      <img src={logoSrc} alt="Логотип компании" className='logo__pic' /> 
    </a>
  )
}

export default Logo;
