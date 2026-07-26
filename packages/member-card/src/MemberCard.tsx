import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';

import { Avatar, type AvatarProps, type AvatarShape } from '@sipe-team/avatar';
import { vars } from '@sipe-team/tokens';
import { Typography } from '@sipe-team/typography';

import { clsx as cx } from 'clsx';

import * as styles from './MemberCard.css';
import { SocialIconLink, type SocialIconLinkProps, type SocialType } from './SocialIconLink';

export const MemberCardVariant = {
  filled: 'filled',
  outline: 'outline',
} as const;
export type MemberCardVariant = (typeof MemberCardVariant)[keyof typeof MemberCardVariant];

export interface MemberCardLink {
  type: SocialType;
  url: string;
}

export interface MemberCardProps extends Omit<ComponentProps<'article'>, 'children'> {
  name: string;
  part: string;
  period?: string | number;
  imgSrc?: string;
  imgAlt?: string;
  avatarShape?: AvatarShape;
  isOrganizer?: boolean;
  introduce?: string;
  review?: string;
  links?: MemberCardLink[];
  variant?: MemberCardVariant;
  socialSize?: SocialIconLinkProps['size'];
}

function OrganizerBadge() {
  return (
    <Typography asChild size={12} weight="semiBold" lineHeight="compact" color={vars.color.accent.default}>
      <span className={styles.organizer}>
        Organizer
        <svg
          className={styles.organizerMark}
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M15.3337 7L13.707 5.14L13.9337 2.68L11.527 2.13333L10.267 0L8.00033 0.973333L5.73366 0L4.47366 2.12667L2.06699 2.66667L2.29366 5.13333L0.666992 7L2.29366 8.86L2.06699 11.3267L4.47366 11.8733L5.73366 14L8.00033 13.02L10.267 13.9933L11.527 11.8667L13.9337 11.32L13.707 8.86L15.3337 7ZM6.25366 9.67333L4.66699 8.07333C4.40699 7.81333 4.40699 7.39333 4.66699 7.13333L4.71366 7.08667C4.97366 6.82667 5.40033 6.82667 5.66033 7.08667L6.73366 8.16667L10.167 4.72667C10.427 4.46667 10.8537 4.46667 11.1137 4.72667L11.1603 4.77333C11.4203 5.03333 11.4203 5.45333 11.1603 5.71333L7.21366 9.67333C6.94033 9.93333 6.52033 9.93333 6.25366 9.67333Z"
          />
        </svg>
      </span>
    </Typography>
  );
}

export const MemberCard = forwardRef(function MemberCard(
  {
    className,
    name,
    part,
    period,
    imgSrc,
    imgAlt,
    avatarShape = 'rounded',
    isOrganizer = false,
    introduce,
    review,
    links,
    variant = 'filled',
    socialSize = 'sm',
    ...props
  }: MemberCardProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const avatarProps: AvatarProps = {
    className: styles.avatar,
    alt: imgAlt ?? `${name} profile`,
    size: 'lg',
    shape: avatarShape,
    fallback: name.charAt(0),
    ...(imgSrc ? { src: imgSrc } : {}),
  };

  const partText = period !== undefined && period !== '' ? `${period}기 · ${part}` : part;

  return (
    <article ref={ref} className={cx(styles.root({ variant }), className)} {...props}>
      <header className={styles.header}>
        <Avatar {...avatarProps} />
        <div className={styles.info}>
          <div className={styles.mainRow}>
            <Typography asChild size={16} weight="bold" lineHeight="compact" color={vars.color.foreground.default}>
              <h3 className={styles.name}>{name}</h3>
            </Typography>
            {links && links.length > 0 && (
              <ul className={styles.links}>
                {links.map(({ type, url }) => (
                  <li key={type} className={styles.linkItem}>
                    <SocialIconLink type={type} url={url} size={socialSize} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.subRow}>
            <Typography asChild size={12} weight="medium" lineHeight="compact" color={vars.color.foreground.muted}>
              <p>{partText}</p>
            </Typography>
            {isOrganizer && <OrganizerBadge />}
          </div>
        </div>
      </header>
      {introduce && (
        <Typography asChild size={14} weight="semiBold" lineHeight="compact" color={vars.color.foreground.subtle}>
          <p>{introduce}</p>
        </Typography>
      )}
      {review && (
        <section className={styles.reviewSection}>
          <Typography asChild size={14} weight="bold" lineHeight="compact" color={vars.color.foreground.default}>
            <h4>활동후기</h4>
          </Typography>
          <Typography asChild size={14} weight="regular" lineHeight="compact" color={vars.color.foreground.subtle}>
            <p>{review}</p>
          </Typography>
        </section>
      )}
    </article>
  );
});
