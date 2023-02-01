import React from 'react';

const TelegramAuth = ({ handleAuth }) => {
  const ref = React.useRef()
  window.handleAuth = handleAuth

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.setAttribute('data-telegram-login', 'NonameTelegramLoginBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', "handleAuth(user)");
    ref.current.appendChild(script)
  }, [])

  return (
    <div ref={ref}>
      
    </div>
  );
};

export default TelegramAuth;