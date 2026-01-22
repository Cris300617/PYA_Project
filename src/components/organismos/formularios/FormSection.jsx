import styled from "styled-components";

import { useState } from "react";

export function FormSection({ title, index, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Section $even={index % 2 === 0}>
      <Header onClick={() => setOpen(o => !o)}>
        <h4>{title}</h4>
        <Arrow $open={open}>▾</Arrow>
      </Header>

      <Content $open={open}>
        <div className="grid">{children}</div>
      </Content>
    </Section>
  );
}


const Section = styled.section`
  background: ${({ $even }) => ($even ? "#f8fafc" : "#ffffff")};
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 14px;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
    border-left: 4px solid #15e47c;
    padding-left: 12px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
    border-left: 4px solid #15e47c;
    padding-left: 12px;
  }
`;

const Arrow = styled.span`
  font-size: 1.2rem;
  transition: transform 0.25s ease;
  transform: rotate(${({ $open }) => ($open ? "0deg" : "-90deg")});
  color: #64748b;
`;

const Content = styled.div`
  transition: max-height 0.3s ease, opacity 0.25s ease;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  max-height: ${({ $open }) => ($open ? "2000px" : "0px")};

  ${({ $open }) =>
    !$open &&
    `
      overflow: hidden;
    `}

  > .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 20px;
  }
`;

