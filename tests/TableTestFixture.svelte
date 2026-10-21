<script lang="ts">
	import { Table, TableHeader, TableBody, TableRow, TableCell, TableFooter } from '$lib/index.js';
</script>

<Table fullWidth striped dense hoverable caption="Extrato Mensal">
	<TableHeader>
		<TableRow>
			<TableCell asHead>Data</TableCell>
			<TableCell asHead>Descrição</TableCell>
			<TableCell asHead align="numeric">Valor</TableCell>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell>2026-10-21</TableCell>
			<TableCell>Aporte Tesouro</TableCell>
			<TableCell align="numeric">R$ 1.500,00</TableCell>
		</TableRow>
		<TableRow selected>
			<TableCell>2026-10-20</TableCell>
			<TableCell>Supermercado</TableCell>
			<TableCell align="numeric">-R$ 342,50</TableCell>
		</TableRow>
	</TableBody>
	<TableFooter>
		<TableRow>
			<TableCell colspan={2}>Saldo Líquido</TableCell>
			<TableCell align="numeric">R$ 1.157,50</TableCell>
		</TableRow>
	</TableFooter>
</Table>
