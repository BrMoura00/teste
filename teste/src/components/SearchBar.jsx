import React, { useState } from 'react';
import { Search, Github, Settings, User, LifeBuoy, Moon, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import './SearchBar.css';

const SearchBar = ({ setSearchTerm, isSelectionMode, toggleSelectionMode }) => {
  const [expanded, setExpanded] = useState(false);

  const handleSearchIconClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="search-bar">
      <div className="search-icon" onClick={handleSearchIconClick}>
        <Search size={24} />
      </div>
      <input
        type="search"
        placeholder="Procurar"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: expanded ? '200px' : '0', visibility: expanded ? 'visible' : 'hidden' }}
      />
      <div className="menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleSelectionMode}>
                <List className="mr-2 h-4 w-4" />
                <span>{isSelectionMode ? 'Cancelar Modo de Seleção' : 'Ativar Modo de Seleção'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Moon className="mr-2 h-4 w-4" />
                <span>Modo Escuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = "https://github.com/BrMoura00/teste.git"}>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem as={Link} to="/support">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Suporte</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchBar;
// tetse