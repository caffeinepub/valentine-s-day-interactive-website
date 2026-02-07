interface AnimatedJarProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  isClickable?: boolean;
}

export default function AnimatedJar({ isOpen = false, onClick, className = '', isClickable = true }: AnimatedJarProps) {
  return (
    <div 
      className={`animated-jar ${className} ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={isClickable ? onClick : undefined}
      style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
    >
      {/* Jar container */}
      <div className="jar-container">
        {/* Jar lid - falls when opened */}
        <div className={`jar-lid ${isOpen ? 'falling' : ''}`}>
          <div className="jar-lid-knob"></div>
        </div>
        
        {/* Jar neck */}
        <div className="jar-neck"></div>
        
        {/* Jar body with chits */}
        <div className="jar-body">
          {/* Decorative chits inside */}
          <div className="chit chit-1">♥</div>
          <div className="chit chit-2">♥</div>
          <div className="chit chit-3">♥</div>
          <div className="chit chit-4">♥</div>
          <div className="chit chit-5">♥</div>
          <div className="chit chit-6">♥</div>
          <div className="chit chit-7">♥</div>
          <div className="chit chit-8">♥</div>
        </div>
      </div>
    </div>
  );
}
