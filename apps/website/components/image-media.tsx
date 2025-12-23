'use client'

import { cn } from '@/lib/utils'
import type { Media } from '@/payload/payload-types'
import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import { ElementType, Ref } from 'react'

type MediaProps = & {
    alt?: string
    className?: string
    fill?: boolean
    htmlElement?: ElementType | null
    pictureClassName?: string
    imgClassName?: string
    onClick?: () => void
    onLoad?: () => void
    loading?: 'lazy' | 'eager'
    priority?: boolean
    ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
    resource?: Media | string | number | null
    src?: StaticImageData
}


// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEXw8PDu7u7s7Ozz8/Pp6en19fXl5eX39/f5+fnj4+Pg4OD7+/va2trd3d2IXF81AAABCElEQVQoz23Q0WnDMBSF4Su0gK438EX0OWCygBHZQPS9GEEmcEcQ5N3QbJDSTpANShfoNj3HCjGE+MFYH790keVzGVVEupfz789bGIan0MvuEVDE49ffChdsQaHx+H0ZCR9rASjnpUEBeFE7lMmCb4DCdbGkOwQPsIgPwEJAoWa2QiFwTGemIoBp7PGBBI/4DSQoQow9JCNQRDxgIgSC934AJEAAULDOksZbscMB+5zFMA1FC3IDzuMRDGZAr+ooDOYGTgIEwUzgDjZ3UATO4eX3r/N7BXBowJtQqzAQ3BVXzwgIAeBw1A0Q8G9s4BRrQg+o9SQqKDa4igssuphWOF3bGU43eCz+AfFaXn8IWyYZAAAAAElFTkSuQmCC'

export const ImageMedia = (props: MediaProps) => {
    const {
        alt: altFromProps,
        fill,
        pictureClassName,
        imgClassName,
        priority,
        resource,
        src: srcFromProps,
        loading: loadingFromProps,
    } = props

    let width: number | undefined
    let height: number | undefined
    let alt = altFromProps
    let src: StaticImageData | string = srcFromProps || ''

    if (!src && resource && typeof resource === 'object') {
        const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

        width = fullWidth!
        height = fullHeight!
        alt = altFromResource || ''

        const cacheTag = resource.updatedAt

        src = getMediaUrl(url, cacheTag)
    }

    const loading = loadingFromProps || (!priority ? 'lazy' : undefined);

    return (
        <picture className={cn(pictureClassName)}>
            <NextImage
                alt={alt || ''}
                className={cn(imgClassName)}
                fill={fill}
                placeholder="blur"
                blurDataURL={placeholderBlur}
                priority={priority}
                loading={loading}
                src={src}
                quality={100}
                height={!fill ? height : undefined}
                width={!fill ? width : undefined}
            />
        </picture>
    )
}

export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
    if (!url) return ''

    if (cacheTag && cacheTag !== '') {
        cacheTag = encodeURIComponent(cacheTag)
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
        return cacheTag ? `${url}?${cacheTag}` : url
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL
    return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}

