import React, { useState, useEffect } from 'react';
import { Search, Github, Settings, User, LifeBuoy, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleSearchIconClick = () => {
    setExpanded(!expanded);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGithubClick = () => {
    window.location.href = "https://github.com/BrMoura00/teste.git";
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
              <DropdownMenuItem onClick={toggleDarkMode}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Modo Escuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleGithubClick}>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchBar;
