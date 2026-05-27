import { ColorChip } from "../components/ColorChip";
import { ColorScale } from "../components/ColorScale";
import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import {
  PRIMARY_CHIPS,
  SECONDARY_CHIPS,
  RED_SCALE,
  GRAY_SCALE,
} from "../config/colors";

export function Colors() {
  return (
    <Section id="colors">
      <SectionHeader
        title="Colors"
        jp="色彩"
        description="The Shinzo palette is anchored by a deep crimson red — decisive, bold, and distinctive. Neutrals provide clean contrast. Click any swatch to copy its hex value."
      />

      <SectionBody>
        <SubsectionTitle>Brand Colors</SubsectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-4">
          {PRIMARY_CHIPS.map((chip) => (
            <ColorChip key={chip.hex} {...chip} />
          ))}
        </div>

        <SubsectionTitle>Interface Colors</SubsectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-0 mb-12">
          {SECONDARY_CHIPS.map((chip) => (
            <ColorChip key={chip.label ?? chip.hex} {...chip} />
          ))}
        </div>

        <SubsectionTitle>Color Scales</SubsectionTitle>
        <ColorScale label="Red"  entries={RED_SCALE}  className="mb-3" />
        <ColorScale label="Gray" entries={GRAY_SCALE} showLabels />
      </SectionBody>
    </Section>
  );
}
