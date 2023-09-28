'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const ContactCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>Send us a message</CardDescription>
            </CardHeader>

        </Card>
    )
}

export default ContactCard;

