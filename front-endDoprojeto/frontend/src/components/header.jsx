import React from 'react';
import { NavbarSection, Navbar, ImgLogo, TextLogo, SpanTextLogo, PagesNav, TextHeader } from "../Styles/HeaderStyle.js";
import { Link } from 'react-router-dom'; // Importando o Link
import logo from "../img/logo (1).png";

const Header = () => {
    return(
        <NavbarSection>
            <Navbar>
                <ImgLogo src={logo} alt="Logo" />
                <TextLogo>Time<SpanTextLogo>Planner</SpanTextLogo></TextLogo>
            </Navbar>
            <PagesNav>
                {/* Usando Link para navegação */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextHeader>Atendimento</TextHeader>
                </Link>
                <Link to="/horarios" style={{ textDecoration: 'none' }}>
                    <TextHeader>Horários</TextHeader>
                </Link>
                <Link to="/agendamento" style={{ textDecoration: 'none' }}>
                    <TextHeader>Agendamento</TextHeader>
                </Link>
            </PagesNav>
        </NavbarSection>
    );
}

export default Header;
