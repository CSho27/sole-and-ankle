import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price strikethrough={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <Price>{formatPrice(salePrice)}</Price>}
        </Row>
        {variant === 'new-release' && <Notice variant={variant}>Just released!</Notice>}
        {variant === 'on-sale' && <Notice variant={variant}>Sale</Notice>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  overflow: hidden;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  flex: 1 1 fit-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Price = styled.span`
  text-decoration: ${p => p.strikethrough ? 'line-through' : undefined};
  color: ${p => p.strikethrough ? COLORS.gray[500] : undefined };
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Notice = styled.div`
  background-color: ${p => p.variant === 'new-release' 
    ? COLORS.secondary 
    : p.variant === 'on-sale' 
      ? COLORS.primary 
      : undefined};
  position: absolute;
  top: 8px;
  right: -4px;
  border-radius: 2px;
  font-size: 12px;
  color: white;
  padding: 4px 8px;
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
