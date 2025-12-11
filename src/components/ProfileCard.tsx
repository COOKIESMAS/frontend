import styled from 'styled-components'
import profile from '@/assets/image/profile.png'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  width: 320px;
  background: #ffffff;
  padding: 24px 48px;
  border-radius: 4px;
  box-shadow: 0 8px 20px rgba(20, 20, 30, 0.12);
  position: relative;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  white-space: pre-line; /* 줄바꿈을 그대로 반영 */
`

const Img = styled.img``

/* --- Component --- */
export default function ProfileCard() {
  return (
    <Card role="dialog" aria-label="Profile card">
      <Title>{`
      메타모스트에서
      친구 프로필을 클릭해주세요.
      `}</Title>
      <Img src={profile} />
    </Card>
  )
}
