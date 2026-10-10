import { on } from '../../utils/on';

/**
 * AvatarPicker
 * FIX 3: Avani always a lady — refined female SVG avatars
 *
 * Static markup converted 1:1 from the original HTML (id: -, class: avatar-picker).
 * Behaviour is attached by the legacy scripts in /public/legacy via element ids,
 * so keep ids/classes unchanged and do not add props/state to this component.
 */
export default function AvatarPicker() {
  return (
    <div className="avatar-picker">
      <div className="av-picker-title">
        Choose your Avani
      </div>
      <div className="av-options">
        <div className="av-opt selected" onClick={on(function(event){selectAvatar(this)
})}>
          <div className="av-opt-img">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="#0f6e56" />
              {/* saree lady */}
              <ellipse cx="24" cy="13" rx="8" ry="5.5" fill="#1a0a00" />
              <ellipse cx="31" cy="17" rx="2" ry="5" fill="#1a0a00" />
              <circle cx="24" cy="17.5" r="8.5" fill="#c8835a" />
              <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="17" cy="20" rx="2.5" ry="1.2" fill="#c8835a" />
              <ellipse cx="31" cy="20" rx="2.5" ry="1.2" fill="#c8835a" />
              {/* bindi */}
              <circle cx="24" cy="14.5" r=".9" fill="#e24b4a" />
              {/* saree body */}
              <path d="M13 30 Q24 26 35 30 L37 48 H11 Z" fill="#1d9e75" />
              <path d="M13 30 Q24 26 35 30 L35 33 Q24 29 13 33 Z" fill="#FFD700" />
              <rect x="20" y="26" width="8" height="5" fill="#c8835a" />
            </svg>
          </div>
          <div className="av-opt-label">
            Traditional
          </div>
        </div>
        <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
          <div className="av-opt-img">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="#185fa5" />
              {/* contemporary */}
              <ellipse cx="24" cy="11" rx="9" ry="4" fill="#1a0a00" />
              {/* bob hair */}
              <ellipse cx="15.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
              <ellipse cx="32.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
              <circle cx="24" cy="18" r="8.5" fill="#d4956b" />
              <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="17" cy="19" rx="2" ry="1" fill="#d4956b" />
              <ellipse cx="31" cy="19" rx="2" ry="1" fill="#d4956b" />
              {/* kurta */}
              <rect x="19" y="26" width="10" height="4" fill="#d4956b" />
              <path d="M11 31 Q24 27 37 31 L38 48 H10 Z" fill="#4a90d9" />
              {/* dupatta */}
              <path d="M11 31 Q24 27 37 31 L37 34 Q24 30 11 34 Z" fill="#fff" />
            </svg>
          </div>
          <div className="av-opt-label">
            Contemporary
          </div>
        </div>
        <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
          <div className="av-opt-img">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="#2d2d2d" />
              {/* professional bun */}
              <ellipse cx="24" cy="10" rx="8" ry="4.5" fill="#1a0a00" />
              <circle cx="24" cy="10" r="4" fill="#1a0a00" />
              {/* bun top */}
              <ellipse cx="15.5" cy="17" rx="1.5" ry="6" fill="#1a0a00" />
              <ellipse cx="32.5" cy="17" rx="1.5" ry="6" fill="#1a0a00" />
              <circle cx="24" cy="18" r="8.5" fill="#c8835a" />
              <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="17" cy="19" rx="2" ry="1" fill="#c8835a" />
              <ellipse cx="31" cy="19" rx="2" ry="1" fill="#c8835a" />
              {/* blazer */}
              <rect x="19" y="26" width="10" height="4" fill="#c8835a" />
              <path d="M10 31 Q24 27 38 31 L39 48 H9 Z" fill="#1a1a2e" />
              {/* collar */}
              <path d="M20 31 L24 36 L28 31" fill="#fff" />
            </svg>
          </div>
          <div className="av-opt-label">
            Professional
          </div>
        </div>
        <div className="av-opt" onClick={on(function(event){selectAvatar(this)
})}>
          <div className="av-opt-img">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="#7c3aed" />
              {/* smart casual ponytail */}
              <ellipse cx="24" cy="11" rx="9" ry="5" fill="#1a0a00" />
              {/* ponytail */}
              <rect x="22" y="10" width="4" height="12" rx="2" fill="#1a0a00" />
              <ellipse cx="15.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
              <ellipse cx="32.5" cy="18" rx="2" ry="7" fill="#1a0a00" />
              <circle cx="24" cy="18" r="8.5" fill="#d4956b" />
              <ellipse cx="21" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <ellipse cx="27" cy="17" rx="1.3" ry=".9" fill="#2a1000" />
              <path d="M21.5 21 Q24 23 26.5 21" stroke="#a0522d" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="17" cy="19" rx="2" ry="1" fill="#d4956b" />
              <ellipse cx="31" cy="19" rx="2" ry="1" fill="#d4956b" />
              <rect x="19" y="26" width="10" height="4" fill="#d4956b" />
              <path d="M11 31 Q24 27 37 31 L38 48 H10 Z" fill="#f97316" />
            </svg>
          </div>
          <div className="av-opt-label">
            Smart Casual
          </div>
        </div>
      </div>
    </div>
  );
}
