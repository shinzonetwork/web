import BlockHero from '@/components/block-hero'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <BlockHero
                eyebrow="Page Not Found"
                title={<>404</>}
                buttons={<>
                    <Button asChild><Link href="/">Return Home</Link></Button>
                </>}
            />
        </div>
    )
}