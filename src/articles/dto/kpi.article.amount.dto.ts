export class KpiArticleAmountDto {
    month: number;
    year: number;
    amount: number;

    public constructor(
        fields?: {
            month?: number,
            year?: number,
            amount?: number
        }) {
        if (fields) Object.assign(this, fields);
    }
}