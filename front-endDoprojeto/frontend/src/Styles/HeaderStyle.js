import styled from "styled-components"

export const NavbarSection = styled.section`
  padding: 20px 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;  // Fundo semitransparente, pode ser ajustado
    position: relative;  // Padrão, sem fixação
    z-index: 10;  // Garante que o header fique sobre o conteúdo, se necessário
`;

export const Navbar = styled.section`
    display: flex;
    align-items: center;
    `

export const ImgLogo = styled.img`
    height: auto;
    width: 60px;
    margin-right: 6px;
`;

export const TextLogo = styled.h1`
    color: white;
    font-family: "Julius Sans One", sans-serif;
    font-weight: 200;
    font-size: 22px;
`;

export const SpanTextLogo = styled.span`
    color: pink;
    font-family: "Julius Sans One", sans-serif;
    margin-left: 5;
`;

export const PagesNav = styled.div`
    display: flex;
`;

export const TextHeader = styled.h4`
    color: #D6C3C3;
    font-family: "Inder", sans-serif;
    font-size: 20px;
    font-weight: 300;
    margin-right: 50px;
    transition: 0.5s;

    &:hover{
        cursor: pointer;
        color: #BC8F8F;
        font-size: 17px;
    }
`;