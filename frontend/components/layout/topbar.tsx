
"use client";

import {
  Menu,
  Bell,
  UserRound,
  ChevronDown,
} from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="topbar-menu-button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <Menu size={23} />
        </button>

        <div className="topbar-title">
          <strong>Portal do Colaborador</strong>
          <span>Sistema de Gestão</span>
        </div>
      </div>

      <div className="topbar-right">
        

        <div className="topbar-profile">
          <div className="profile-avatar">
            <UserRound size={19} />
          </div>

          <div className="profile-info">
            <strong>Colaborador</strong>
            <span>Usuário do sistema</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
