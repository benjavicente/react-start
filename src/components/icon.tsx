import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import type { MaterialSymbol } from 'material-symbols'

export function Icon({ name, className, ...props }: IconProps) {
	return (
		<span className={clsx(className, 'icon')} {...props}>
			{name}
		</span>
	)
}

interface IconProps extends Omit<ComponentProps<'span'>, 'name'> {
	name: MaterialSymbol
}
