import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export const GAMES: { value: string, text: string, key: string }[] = [
  {
    value: 'rby',
    text: 'Red, Blue and Yellow',
    key: '1',
  },
  {
    value: 'gsc',
    text: 'Gold, Silver and Crystal',
    key: '2',
  },
  {
    value: 'rse',
    text: 'Ruby, Sapphire and Emerald',
    key: '3',
  },
  {
    value: 'frlg',
    text: 'FireRed and LeafGreen',
    key: '4',
  },
  {
    value: 'dpp',
    text: 'Diamond, Pearl and Platinum',
    key: '5',
  },
  {
    value: 'hgss',
    text: 'HeartGold and SoulSilver',
    key: '6',
  },
  {
    value: 'bw',
    text: 'Black and White',
    key: '7',
  },
  {
    value: 'bw2',
    text: 'Black 2 and White 2',
    key: '8',
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? GAMES.find((framework) => framework.text === value)?.text
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No game found.</CommandEmpty>
          <CommandGroup>
            {GAMES.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.text}
                onSelect={(currentValue) => {
                  console.log(currentValue)
                  setValue(currentValue === value ? "" : framework.text)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.text ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.text}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
