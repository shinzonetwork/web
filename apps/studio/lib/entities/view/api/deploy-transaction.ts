import type { ViewDefinition } from "@shinzo/lenses/view";
import type { LensArgs, ResolvedLensView } from "@/entities/lens";

export const downloadWasm = async (url: string): Promise<Uint8Array> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download WASM: ${res.status} ${res.statusText}`);
  }
  return new Uint8Array(await res.arrayBuffer());
};

export const toViewDefinition = <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>,
  wasmBytesByStep: readonly Uint8Array[]
): ViewDefinition => {
  if (wasmBytesByStep.length !== view.steps.length) {
    throw new Error(
      `Expected ${view.steps.length} WASM modules for "${view.title}", received ${wasmBytesByStep.length}.`
    );
  }

  return {
    query: view.query,
    sdl: view.sdl,
    lenses: view.steps.map((step, index) => ({
      wasmBytes: wasmBytesByStep[index]!,
      args: step.args,
    })),
  };
};

export const resolveViewDefinition = async <TArgs extends LensArgs>(
  view: ResolvedLensView<TArgs>
): Promise<ViewDefinition> => {
  const wasmBytesByStep = await Promise.all(
    view.steps.map((step) => downloadWasm(step.wasmUrl))
  );

  return toViewDefinition(view, wasmBytesByStep);
};
