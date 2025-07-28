import s from './PetBlock.module.css'

interface PetBlockProps {
  desktop1x: string;
  desktop2x?: string;
  tablet1x: string;
  tablet2x?: string;
  mobile1x: string;
  mobile2x?: string;
  alt?: string;
}

const PetBlock: React.FC<PetBlockProps> = ({
  desktop1x,
  desktop2x,
  tablet1x,
  tablet2x,
  mobile1x,
  mobile2x,
  alt = ''
}) => {
  const desktopSrcSet = desktop2x
    ? `${desktop1x} 1x, ${desktop2x} 2x`
    : `${desktop1x} 1x`;
  const tabletSrcSet = tablet2x
    ? `${tablet1x} 1x, ${tablet2x} 2x`
    : `${tablet1x} 1x`;
  const mobileSrcSet = mobile2x
    ? `${mobile1x} 1x, ${mobile2x} 2x`
    : `${mobile1x} 1x`;

  return (
    <section className={s.petBlockWrapper}>
      <picture>
        <source
          media="(min-width:1280px)"
          srcSet={desktopSrcSet}
        />
        <source
          media="(min-width:768px)"
          srcSet={tabletSrcSet}
        />
        <img
          src={mobile1x}
          srcSet={mobileSrcSet}
          alt={alt}
          className={s.petBlockImage}
        />
      </picture>
    </section>
  );
};

export default PetBlock;