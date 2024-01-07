'use client'

import styled from '@emotion/styled';
import Image from 'next/image';
import girl1 from '@/assets/img/girl-1.png';
import girl2 from '@/assets/img/girl-2.png';
import girl3 from '@/assets/img/girl-3.png';
import girl4 from '@/assets/img/girl-4.png';
import girl5 from '@/assets/img/girl-5.png';
import girl6 from '@/assets/img/girl-6.png';
import girl7 from '@/assets/img/girl-7.png';


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
`

const CardContainerSquare = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
`

const CardContainer = styled.div`
    position: relative;
    width: 115px;
    height: 200px;
`

export default function GirlsCloud() {
    return (
        <Container>
            <CardContainer>
                <Image src={girl5} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainer>
            <CardContainerSquare>
                <Image src={girl2} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainerSquare>
            <CardContainer>
                <Image src={girl6} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainer>
            <CardContainerSquare>
                <Image src={girl3} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainerSquare>
            <CardContainer>
                <Image src={girl4} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainer>
            <CardContainerSquare>
                <Image src={girl7} fill sizes="200px" alt="Plastic girls logo" style={{ objectFit: 'contain', borderRadius: '25px' }} />
            </CardContainerSquare>
        </Container>
    )
}