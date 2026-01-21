import styled from "styled-components";

export function FormSection({ title, index, children }) {
  return (
    <Section $even={index % 2 === 0}>
      <h4>{title}</h4>
      <div className="grid">{children}</div>
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
