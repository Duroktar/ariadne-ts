import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  	build: {
	    lib: {
		    entry: resolve(__dirname, 'src/index.ts'),
		    name: 'ariadne-ts',
		    // the proper extensions will be added
		    fileName: 'ariadne-ts',
		},
	    // It is recommended to not minify the output for libraries.
	    minify: false,
		rollupOptions: {
	      	// make sure to externalize deps that shouldn't be bundled
	      	// into your library
	      	external: [
	      		// 'vue'
	      	],
	      	output: {
		        // Provide global variables to use in the UMD build
		        // for externalized deps
		        globals: {
		          	// vue: 'Vue',
		        },
      		},
		},
  	},
  	plugins: [
	    dts({
	      	// This will generate a single, bundled .d.ts file.
	      	insertTypesEntry: true,
	    }),
  		nodePolyfills({ include: ['fs', 'path'] }),
	],
})
