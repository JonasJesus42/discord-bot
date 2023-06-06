
export function mapSheetGurus(data: string[][]): {
    name: string;
    guildId: string;
    inAttendance: boolean;
}[] {
    return data.map((row: string[]) => {
        return {
            name: row[0],
            guildId: row[1],
            inAttendance: row[2] === 'TRUE',
        }
    })
}