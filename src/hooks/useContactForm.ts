import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { sendContact } from '../services/projects'

const schema = z.object({
    name: z.string().min(2, 'Informe seu nome'),
    email: z.string().email('E-mail inválido'),
    message: z.string().min(10, 'Mensagem muito curta'),
})

export type ContactFormValues = z.infer<typeof schema>

export function useContactForm() {
    const form = useForm<ContactFormValues>({ resolver: zodResolver(schema) })

    const mutation = useMutation({
        mutationFn: sendContact,
    })

    const onSubmit = form.handleSubmit(async (values) => {
        await mutation.mutateAsync(values)
    })

    return { form, onSubmit, mutation }
}
