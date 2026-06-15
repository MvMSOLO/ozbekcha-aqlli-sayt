import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function LabSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  className,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <span className="font-mono text-sm tabular-nums text-foreground">
          {Number.isInteger(step) ? value.toFixed(0) : value.toFixed(2)}
          {unit ? <span className="ml-1 text-xs text-muted-foreground">{unit}</span> : null}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        aria-label={label}
      />
    </div>
  );
}
