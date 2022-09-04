export class HashManagerMock {
    public hash = async (plainText: string): Promise<string> => {
        return "hash"
    }

    public compare = async (plainText:string, cypherText:string): Promise<boolean> => {
        return plainText === cypherText
    }
}